using BusinessObjectLayer;
using Car_Rent_App.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Car_Rent_App.Helper
{
    public class UserLoginToUserHelper
    {
        public User UserLoginToUserMapping(UserLogin e)
        {
            User u = new User();
            u.EmailId = e.EmailId;
            u.Password = e.Password;
            return u;
        }
    }
}
