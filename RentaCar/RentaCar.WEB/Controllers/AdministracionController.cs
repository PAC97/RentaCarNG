using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using RentaCars.BL;
using RentaCars.EN;

namespace RentaCar.WEB.Controllers
{
    public class AdministracionController : Controller
    {
        EstadoBL estadoBL = new EstadoBL();
        // GET: Administracion
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult menu()
        {
            return View();
        }

        #region
        public JsonResult ConsultarEstado()
        {
            return Json(estadoBL.StateList().ToList()); 
        }
        #endregion
    }
}