import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Palette,
  Layers,
  Users,
  Settings,
  Menu,
  Bell,
  Search,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Clock,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Products", icon: Package },
  { label: "Orders", icon: ShoppingBag },
  { label: "Collections", icon: Layers },
  { label: "Colors", icon: Palette },
  { label: "Customers", icon: Users },
  { label: "Settings", icon: Settings },
];

const stats = [
  {
    title: "Total Sales",
    value: "$0.00",
    change: "All time sales",
    icon: DollarSign,
  },
  {
    title: "Total Orders",
    value: "0",
    change: "All orders",
    icon: ShoppingCart,
  },
  {
    title: "Total Products",
    value: "0",
    change: "Handbags & Accessories",
    icon: Package,
  },
  {
    title: "Pending Orders",
    value: "0",
    change: "Awaiting confirmation",
    icon: Clock,
  },
];

function Admin() {
  return (
    <div className="min-h-screen bg-[#F8F8F5] text-[#766C51] md:flex">

      {/* Sidebar */}
      <aside className="w-full border-r border-[#EDEFE3] bg-white md:min-h-screen md:w-64">

        <div className="flex items-center justify-between border-b border-[#EDEFE3] px-6 py-6">
          <div>
            <h1 className="text-2xl font-serif tracking-[0.2em] text-[#766C51]">
              AURA
            </h1>
            <p className="mt-1 text-[10px] tracking-[0.3em] text-[#A5A77D]">
              ADMIN PANEL
            </p>
          </div>

          <button className="md:hidden">
            <Menu size={22} />
          </button>
        </div>

        <nav className="flex gap-2 overflow-x-auto p-4 md:flex-col">
          {menuItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                  index === 0
                    ? "bg-[#EDEFE3] font-medium text-[#766C51]"
                    : "text-[#8D897B] hover:bg-[#F8F8F5]"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="hidden px-6 py-8 md:block">
          <p className="text-xs text-[#A5A77D]">
            AURA HANDBAGS
          </p>
          <p className="mt-2 text-xs text-[#AAA69B]">
            Store Management
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="min-w-0 flex-1">

        {/* Topbar */}
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EDEFE3] bg-white px-5 py-5 md:px-10">
          <div>
            <h2 className="text-xl font-medium text-[#766C51]">
              Dashboard
            </h2>
            <p className="mt-1 text-xs text-[#A5A77D]">
              Welcome to your store management panel
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="rounded-full p-2 hover:bg-[#F8F8F5]">
              <Search size={19} />
            </button>

            <button className="relative rounded-full p-2 hover:bg-[#F8F8F5]">
              <Bell size={19} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#D9B9B1]" />
            </button>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EDEFE3] text-sm font-medium">
              A
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <section className="p-5 md:p-10">

          <div className="mb-8">
            <h3 className="text-2xl font-medium text-[#766C51]">
              Overview
            </h3>
            <p className="mt-2 text-sm text-[#A5A77D]">
              Here is what's happening with your store.
            </p>
          </div>

          {/* Statistics */}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="rounded-2xl border border-[#EDEFE3] bg-white p-6"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[#999486]">
                      {stat.title}
                    </p>

                    <div className="rounded-xl bg-[#EDEFE3] p-3">
                      <Icon size={19} />
                    </div>
                  </div>

                  <h4 className="mt-5 text-3xl font-medium text-[#766C51]">
                    {stat.value}
                  </h4>

                  <p className="mt-2 text-xs text-[#A5A77D]">
                    {stat.change}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Sales Overview */}
          <div className="mt-8 grid gap-6 xl:grid-cols-3">

            <div className="rounded-2xl border border-[#EDEFE3] bg-white p-6 xl:col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Sales Overview</h4>
                  <p className="mt-1 text-xs text-[#A5A77D]">
                    Your store performance
                  </p>
                </div>

                <TrendingUp size={21} />
              </div>

              <div className="flex h-64 items-center justify-center">
                <p className="text-sm text-[#AAA69B]">
                  Sales chart will appear here
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-[#EDEFE3] bg-white p-6">
              <h4 className="font-medium">Recent Orders</h4>

              <div className="flex h-64 items-center justify-center text-center">
                <p className="text-sm text-[#AAA69B]">
                  No orders yet
                </p>
              </div>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}

export default Admin;