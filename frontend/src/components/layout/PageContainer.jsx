export default function PageContainer({ children }) {
    return (
        <main className="flex-1 bg-background p-8">

            <div className="mx-auto max-w-7xl">

                {children}

            </div>

        </main>
    );
}