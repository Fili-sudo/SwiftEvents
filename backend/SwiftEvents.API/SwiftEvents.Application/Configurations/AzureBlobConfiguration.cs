using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Configurations
{
    public class AzureBlobConfiguration
    {
        public string StorageAccountName { get; set; }
        public string StorageAccountKey { get; set; }
        public string ConnectionString { get; set; }
        public string ContainerName { get; set; }
    }
}
