using System;
namespace workspace
{

    public interface ILinkAuthorizationService
    {
        bool IsAuthorized(LinkAuthorizationRequest request);
    }

    public interface ICoderRequestContextFactory
    {
        CoderRequestContext BuildCoderRequestContext();
    }

    public interface IFactory<T>
    {
        T Build();
    }

    public class LinkAuthorizationFactory : IFactory<ILinkAuthorizationService>
    {
        public ILinkAuthorizationService Build()
        {
            throw new NotImplementedException();
        }
    }

    public class CoderRequestContextFactory : ICoderRequestContextFactory
    {
        public CoderRequestContext BuildCoderRequestContext()
        {
            throw new NotImplementedException();
        }
    }

    public class LinkAuthorizationRequest
    {
        private readonly CoderRequestContext _CoderRequestContext;
        private readonly Link _Link;
        private object requestContext;

        public LinkAuthorizationRequest(CoderRequestContext coderRequestContext, Link link)
        {
            if (ReferenceEquals(coderRequestContext, null)) throw new ArgumentNullException("coderRequestContext");
            if (ReferenceEquals(link, null)) throw new ArgumentNullException("link");

            _CoderRequestContext = coderRequestContext;
            _Link = link;
        }

        public CoderRequestContext CoderRequestContext { get { return _CoderRequestContext; } }
        public Link Link { get { return _Link; } }
    }

    public class CoderRequestContext
    {
        private readonly bool _IsLoggedIn;
        private readonly User _User;

        public CoderRequestContext(
            bool isLoggedIn,
            User user)
        {
            if (ReferenceEquals(user, null)) throw new ArgumentNullException("user");

            _IsLoggedIn = isLoggedIn;
            _User = user;
        }

        public User User { get { return _User; } }
        public bool IsLoggedIn { get { return _IsLoggedIn; } }
    }
}