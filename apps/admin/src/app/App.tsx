import { APP_NAME } from "@template/shared";

const modules = ["用户", "订单", "配置", "审计"];

export function App() {
  return (
    <main className="admin-layout">
      <aside className="sidebar">
        <strong>{APP_NAME}</strong>
        <nav>
          {modules.map((module) => (
            <button type="button" key={module}>
              {module}
            </button>
          ))}
        </nav>
      </aside>

      <section className="workspace">
        <header>
          <p>Admin console</p>
          <h1>运营后台预留入口</h1>
        </header>
        <div className="panel">
          <p>
            后台适合放权限、数据表格、配置管理和运营工作流。这里故意与 Web 分开，
            方便以后按角色、菜单和权限独立扩展。
          </p>
        </div>
      </section>
    </main>
  );
}
