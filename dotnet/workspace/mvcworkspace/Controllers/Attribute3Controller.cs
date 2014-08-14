using mvcworkspace.filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace mvcworkspace.Controllers
{
    [MedidataAuthorized("Attribute3")]
    public class Attribute3Controller : Controller
    {
        //
        // GET: /Attribute/

        public ActionResult Index()
        {
            return View();
        }

    }
}
