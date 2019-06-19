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
        Tipo_UsuarioBL tipoUserBL = new Tipo_UsuarioBL();
        UsuarioBL usuarioBL = new UsuarioBL();
        VehiculoBL vehiculoBL = new VehiculoBL();
        #region Vistas Globales
        public ActionResult Index()
        {
            Session["NomUser"] = null;
            Session["Pass"] = null;
            return View("Index");

        }

        public ActionResult menu()
        {
            return View();
        }
        #endregion

        #region  Vistas Estado


        public ActionResult EstadoIndex()
        {
            if(Session["NomUser"] != null && Session["Pass"] != null)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Administracion");
            }
            
        }
        public ActionResult EditEstado()
        {
            if (Session["NomUser"] != null && Session["Pass"] != null)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Administracion");
            }
        }
        #endregion

        #region Vitas Tipo de Usuario
        public ActionResult TipoUserIndex()
        {
            return View();
        }
        public ActionResult EditTipoUser()
        {
            return View();
        }

        public ActionResult DeleteTipoUser()
        {
            return View();
        }
        #endregion

        #region Vitas Usuario
        public ActionResult UserIndex()
        {
            return View();
        }
        public ActionResult EditUser()
        {
            return View();
        }

        public ActionResult DeleteUser()
        {
            return View();
        }
        public ActionResult Login()
        {
            return View();
        }
        #endregion

        #region Vitas Vehiculo
        public ActionResult VehiculoIndex()
        {
            return View();
        }
        public ActionResult EditVehiculo()
        {
            return View();
        }

        public ActionResult DeleteVehiculo()
        {
            return View();
        }
        #endregion

        #region Estado
        [HttpPost]
        public JsonResult CreateEstado(Estado es)
        {
            return Json(estadoBL.AddEstado(es));
        }

        [HttpPost]
        public JsonResult EditEstado(Estado esta)
        {

            return Json(estadoBL.UpdateState(esta));
        }
        public JsonResult ConsultarEstado()
        {
            
            return Json(estadoBL.StateList().ToList(), JsonRequestBehavior.AllowGet); 
        }
       
        public JsonResult ConsultarEstadoID(int id)
        {
            return Json(estadoBL.FindState(id), JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region Tipo de Usuario
        [HttpPost]
        public JsonResult CreateTipoUser(TipoUsuario tu)
        {
            return Json(tipoUserBL.InserTipo_Usuario(tu));
        }

        [HttpPost]
        public JsonResult EditTipoUser(TipoUsuario tu)
        {

            return Json(tipoUserBL.UpdateTipo_Usuario(tu));
        }
        public JsonResult ConsultarTipoUser(string state)
        {
            List<TipoUsuario> tipoUsuarios = new List<TipoUsuario>();
            List<TipoUsuario> estados = tipoUserBL.Tipo_UsuarioList(state).ToList();
            foreach (var item in estados)
            {
               item.Estado = estadoBL.FindState(item.EstadoID);
                tipoUsuarios.Add(item);
            }
            return Json(tipoUsuarios, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ConsultarTipoUserID(int id)
        {
            List<Estado> estados = new List<Estado>();
            TipoUsuario tipoUsuario = tipoUserBL.FindTipo_Usuario(id);
            
            return Json(tipoUsuario, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult DeleteTipoUser(int id)
        {
            return Json(tipoUserBL.DeleteTipo_Usuario(id), JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region Usuario
        [HttpPost]
        public JsonResult CreateUser(Usuario usuario)
        {
            return Json(usuarioBL.InserUsuario(usuario));
        }

        [HttpPost]
        public JsonResult EditUser(Usuario usuario)
        {

            return Json(usuarioBL.UpdateUsuario(usuario));
        }
        public JsonResult ConsultarUser(string state)
        {
            
            List<Usuario> usuarios = new List<Usuario>();
            List<Usuario> estados = usuarioBL.UsuarioList(state).ToList();
            foreach (var item in estados)
            {
                item.TipoUsuario = tipoUserBL.FindTipo_Usuario(item.TipoUsuarioID);
                item.Estado = estadoBL.FindState(item.EstadoID);
                usuarios.Add(item);
            }
            return Json(usuarios, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ConsultarUserID(int id)
        {
         
            Usuario usuario = usuarioBL.FindUsuario(id);

            return Json(usuario, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult DeleteUser(int id)
        {
            return Json(usuarioBL.DeleteUsuario(id), JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public int ComprobarUser(string nomUser, string pass)
        {
            int r = 0;
            Usuario usuario = usuarioBL.ConsultarUsuarioID(nomUser, pass);
            if(usuario != null)
            {
                r = 1;
                Session["NombreCompleto"] = usuario.Nombre.ToUpper() + " " + usuario.Apellido.ToUpper();
                Session["NomUser"] = usuario.NombreUser;
                Session["Pass"] = usuario.Pass;
                Session["UsuarioID"] = usuario.UsuarioID;
            }
            return r;
        }
        #endregion

        #region Vehiculo
        [HttpPost]
        public JsonResult CreateVehiculo(Vehiculo vehiculo)
        {
            return Json(vehiculoBL.InserVehiculo(vehiculo));
        }

        [HttpPost]
        public JsonResult EditVehiculo(Vehiculo vehiculo)
        {

            return Json(vehiculoBL.UpdateVehiculo(vehiculo));
        }
        public JsonResult ConsultarVehiculo(string state)
        {

            List<Vehiculo> vehiculos = new List<Vehiculo>();
            List<Vehiculo> estados = vehiculoBL.VehiculoList(state).ToList();
            foreach (var item in estados)
            {
                item.Usuario = usuarioBL.FindUsuario(item.UsuarioID);
                item.Estado = estadoBL.FindState(item.EstadoID);
                vehiculos.Add(item);
            }
            return Json(vehiculos, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ConsultarVehiculoID(int id)
        {

            Vehiculo vehiculo = vehiculoBL.FindVehiculo(id);

            return Json(vehiculo, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult DeleteVehiculo(int id)
        {
            return Json(usuarioBL.DeleteUsuario(id), JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}