using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using workspace;

namespace mvcworkspace.Controllers
{
    public class Injection3Controller : Controller
    {
        private static readonly Link                 _ControllerLink = new Link("Injection", string.Empty);
        private readonly ILinkAuthorizationService   _AuthorizationService;
        private readonly ICoderRequestContextFactory _CoderRequestContextFactory;

        public Injection3Controller(
            IFactory<ILinkAuthorizationService> linkAuthorizationServiceFactory,
            ICoderRequestContextFactory coderRequestContextFactory)
        {
            _AuthorizationService = linkAuthorizationServiceFactory.Build();
            _CoderRequestContextFactory = coderRequestContextFactory;
        }


        //
        // GET: /Injection2/

        public ActionResult Index()
        {
            var requestContext    = _CoderRequestContextFactory.BuildCoderRequestContext();
            var authorizedRequest = new LinkAuthorizationRequest(requestContext, _ControllerLink);
            var isAuthorized      = _AuthorizationService.IsAuthorized(authorizedRequest);

            if (!isAuthorized)
            {
                var notLoggedInRedirectPage = Config.CoderNotLoggedInRedirectUrl;
                var unAuthorizedResult      = new RedirectResult(notLoggedInRedirectPage);

                return unAuthorizedResult;
            }

            // DO REQUEST LOGIC

            return View();
        }

    }
}
