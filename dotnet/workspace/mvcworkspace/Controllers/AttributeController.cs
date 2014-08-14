using mvcworkspace.filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace mvcworkspace.Controllers
{
    [MedidataAuthorized("Attribute")]
    public class AttributeController : Controller
    {
        //
        // GET: /Attribute/

        public ActionResult Index()
        {
            return View();
        }

    }
}
