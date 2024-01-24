using BusinessObjectLayer;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.Interface
{
    public interface IUserDAL
    {
        public User IsValid(User user);
        public bool AddUser(User user);
    }
}
