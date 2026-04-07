import Link from "next/link";

type AppShellProps = {
    children: React.ReactNode;
    subtitle?: string;
};

export function AppShell({ children, subtitle }: AppShellProps) {
    return (
        <div className="site-shell">
            <header className="top-nav">
                <Link href="/" className="brand">
                    MealApp
                </Link>
                <nav className="nav-links">
                    <Link href="/">Ingredients</Link>
                </nav>
            </header>

            <section className="hero">
                <h1> Meal explore</h1>
                <p>{subtitle}</p>
            </section>
            {children}
        </div>
    )
};