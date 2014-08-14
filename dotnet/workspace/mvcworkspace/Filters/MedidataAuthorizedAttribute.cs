using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using mvcworkspace.Models;
using workspace;

namespace mvcworkspace.filters
{


    // Summary:
    //     Represents an attribute that is used to restrict access by callers to an
    //     action method.
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, Inherited = true, AllowMultiple = false)]
    public class MedidataAuthorizedAttribute : FilterAttribute, IAuthorizationFilter
    {
        private readonly IRequestAuthorizationService _AuthorizationService;
        private readonly String                       _ControllerActionName;

        internal MedidataAuthorizedAttribute(
            string controllerActionName,
            IRequestAuthorizationService authorizationService)
        {
            _AuthorizationService = authorizationService;
            _ControllerActionName       = controllerActionName;
        }

        public MedidataAuthorizedAttribute(string controllerActionName)
            : this(controllerActionName, 
                new RequestAuthorizationService(
                    new LinkAuthorizationFactory(), 
                    new CoderRequestContextFactory())
                )
        {
        }

        public void OnAuthorization(AuthorizationContext filterContext)
        {
            var isAuthorized = _AuthorizationService.IsAuthorized(_ControllerActionName);
            if (isAuthorized) return;

            var notLoggedInRedirectPage = Config.CoderNotLoggedInRedirectUrl;
            filterContext.Result        = CreateUnauthorizedActionResult(notLoggedInRedirectPage, filterContext);
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
    }
}
