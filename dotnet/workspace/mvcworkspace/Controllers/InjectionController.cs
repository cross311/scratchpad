﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using mvcworkspace.Models;
using workspace;

namespace mvcworkspace.Controllers
{
    public class InjectionController : Controller
    {
        private const string                            _ControllerActionName = @"Injection";
        private readonly IRequestAuthorizationService   _AuthorizationService;

        public InjectionController(
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
            var isAuthorized                = _AuthorizationService.IsAuthorized(_ControllerActionName);

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
