using BusinessObjectLayer;
using Car_Rent_App.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Car_Rent_App.Helper
{
    public class UserModelToUserHelper
    {
        public User UserModelToUserMapping(UserModel e)
        {
            User u = new User();
            u.Name = e.Name;
            u.PhoneNumber = e.PhoneNumber;
            u.EmailId = e.EmailId;
            u.Password = e.Password;
            return u;
        }
    }
}
