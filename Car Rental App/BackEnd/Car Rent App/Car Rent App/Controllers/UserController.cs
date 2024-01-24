using BusinessLayer.Interface;
using BusinessObjectLayer;
using Car_Rent_App.Models;
using Car_Rent_App.Helper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;

namespace Car_Rent_App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserBL _userBl;

        public UserController(IUserBL userBl)
        {
            _userBl = userBl;
        }

        // POST api/<UserController>
        [HttpPost]
        [Route("login/post")]
        public Object Post(UserLogin val)
        {
            if (ModelState.IsValid)
            {
                User user = new UserLoginToUserHelper().UserLoginToUserMapping(val);
                var userdummy = _userBl.IsValid(user);
                if (userdummy != null)
                {
                    return userdummy;
                }
                else
                    return new { msg = "no match" };
            }
            return new { msg = "no fill" };
        }

        [HttpPost]
        [Route("register/post")]
        public bool Post([FromBody] UserModel val)
        {
            if (val != null)
            {
                User user = new UserModelToUserHelper().UserModelToUserMapping(val);
                if (ModelState.IsValid)
                {
                    if (_userBl.AddUser(user))
                        return true;
                    else
                        return false;
                }
            }
            return false;
        }
    }
}
