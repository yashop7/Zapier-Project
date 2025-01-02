import { FC } from 'react'

const Dashboard: FC = () => {
    return (
        <div className="min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="grid gap-4">
                <div className="p-4 bg-white dark:text-black rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">Welcome</h2>
                    <p>This is your dashboard page. Add your dashboard content here.</p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard