using BusinessObjectLayer;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLayer.Interface
{
    public interface IUserBL
    {
        public User IsValid(User user);
        public bool AddUser(User user);
    }
}
