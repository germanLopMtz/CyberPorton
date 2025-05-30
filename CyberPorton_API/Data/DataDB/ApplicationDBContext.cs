using CyberPorton_API.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace CyberPorton_API.Data.DataDB
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Usuario> Usuarios => Set<Usuario>();
        public DbSet<Categoria> Categorias => Set<Categoria>();
        public DbSet<Producto> Productos => Set<Producto>();
        public DbSet<Pedido> Pedidos => Set<Pedido>();
        public DbSet<DetallePedido> DetallesPedido => Set<DetallePedido>();
        public DbSet<Pago> Pagos => Set<Pago>();
        public DbSet<Envio> Envios => Set<Envio>();
    }
}
