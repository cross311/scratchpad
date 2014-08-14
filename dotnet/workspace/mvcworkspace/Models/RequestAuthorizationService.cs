using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using workspace;

namespace mvcworkspace.Models
{
    public interface IRequestAuthorizationService
    {
        bool IsAuthorized(string actionName);
    }

    public class RequestAuthorizationService : IRequestAuthorizationService
    {
        private readonly ILinkAuthorizationService   _AuthorizationService;
        private readonly ICoderRequestContextFactory _RequestFactory;

        public RequestAuthorizationService(
            IFactory<ILinkAuthorizationService> authorizationServiceFactory,
            ICoderRequestContextFactory requestFactory)
        {
            _AuthorizationService = authorizationServiceFactory.Build();
            _RequestFactory       = requestFactory;
        }

        public bool IsAuthorized(string actionName)
        {
            var link                 = ResolveLink(actionName);
            var requestContext       = _RequestFactory.BuildCoderRequestContext();
            var authorizationRequest = new LinkAuthorizationRequest(requestContext, link);
            var isAuthorized         = _AuthorizationService.IsAuthorized(authorizationRequest);

            return isAuthorized;
        }

        private static Link ResolveLink(string actionName)
        {
            var link = new Link(actionName, string.Empty);
            return link;
        }
    }
}