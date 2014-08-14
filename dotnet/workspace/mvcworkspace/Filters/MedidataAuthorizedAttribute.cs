using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using workspace;

namespace mvcworkspace.filters
{


    // Summary:
    //     Represents an attribute that is used to restrict access by callers to an
    //     action method.
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, Inherited = true, AllowMultiple = false)]
    public class MedidataAuthorizedAttribute : FilterAttribute, IAuthorizationFilter
    {
        private readonly ILinkAuthorizationService _AuthorizationService;
        private readonly ICoderRequestContextFactory _RequestFactory;
        private readonly String _ControllerName;

        internal MedidataAuthorizedAttribute(
            string controllerName,
            IFactory<ILinkAuthorizationService> authorizationServiceFactory,
            ICoderRequestContextFactory requestContextFactory)
        {
            _AuthorizationService = authorizationServiceFactory.Build();
            _ControllerName = controllerName;
            _RequestFactory = requestContextFactory;
        }

        public MedidataAuthorizedAttribute(string controllerName)
            : this(controllerName, new LinkAuthorizationFactory(), new CoderRequestContextFactory())
        {
        }

        public void OnAuthorization(AuthorizationContext filterContext)
        {
            var isAuthorized = IsAuthorized();
            if (isAuthorized) return;

            var notLoggedInRedirectPage = Config.CoderNotLoggedInRedirectUrl;
            filterContext.Result = CreateUnauthorizedActionResult(notLoggedInRedirectPage, filterContext);
        }

        /// <summary>
        /// Used to create an action result
        /// for an unauthorized action
        /// </summary>
        /// <param name="notLoggedInRedirectPage">Url where logged out user should go</param>
        /// <returns></returns>
        protected virtual ActionResult CreateUnauthorizedActionResult(string notLoggedInRedirectPage, AuthorizationContext authorizationContext)
        {
            if (string.IsNullOrWhiteSpace(notLoggedInRedirectPage)) throw new ArgumentNullException("notLoggedInRedirectPage");
            if (ReferenceEquals(authorizationContext, null)) throw new ArgumentNullException("authorizationContext");

            var result = new RedirectResult(notLoggedInRedirectPage);
            return result;
        }

        private bool IsAuthorized()
        {
            var link = ResolveLink(_ControllerName);
            var requestContext = _RequestFactory.BuildCoderRequestContext();
            var request = new LinkAuthorizationRequest(requestContext, link);

            var isAuthorized = _AuthorizationService.IsAuthorized(request);

            return isAuthorized;
        }

        // TODO: EVALUTE THIS
        private Link ResolveLink(string linkName)
        {
            var link = new Link(linkName, string.Empty);
            return link;
        }
    }
}
