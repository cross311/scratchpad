using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using mvcworkspace.Models;
using workspace;

namespace mvcworkspace.Controllers
{
    public class Injection2Controller : Controller
    {
       private const string                             _ControllerActionName = @"Injection2";
        private readonly IRequestAuthorizationService   _AuthorizationService;

        public Injection2Controller(
            IRequestAuthorizationService authorizationService)
        {
            _AuthorizationService = authorizationService;
        }


        //
        // GET: /Injection/

        public ActionResult Index()
        {
            // this must be done in each
            // action because we need to return
            // and redirection result
            var isAuthorized                = _AuthorizationService.IsAuthorized(_ControllerActionName, Request);

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
