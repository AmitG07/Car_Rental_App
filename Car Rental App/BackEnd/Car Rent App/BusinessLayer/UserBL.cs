using BusinessLayer.Interface;
using BusinessObjectLayer;
using DataAccessLayer.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLayer
{
    public class UserBL : IUserBL
        {
            private readonly IUserDAL _userDal;

            public UserBL(IUserDAL userDal)
            {
                _userDal = userDal;
            }

            public User IsValid(User user)
            {
                var u = _userDal.IsValid(user);
                if (u != null)
                    return u;
                else
                    return null;
            }

        public bool AddUser(User user)
        {
            if (_userDal.AddUser(user))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
