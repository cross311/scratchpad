using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace workspace
{
    public class Link
    {
        private readonly string _name;
        private readonly string _url;

        /// <summary>
        /// Link
        /// </summary>
        /// <param name="name"></param>
        /// <param name="url"></param>
        public Link(string name, string url)
        {
            _name = name;
            _url = url;
        }

        public string Name { get { return _name; } }
        public string Url { get { return _url; } }
    }
}
