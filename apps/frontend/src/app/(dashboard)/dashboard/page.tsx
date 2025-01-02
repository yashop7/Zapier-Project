import  DashboardOverview  from '@/components/Dashboard/DashboardOverview'
import { ZapsList } from '@/components/Dashboard/ZapsList'
import { FC } from 'react'

const Dashboard: FC = () => {
    return (
        <div className=" p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="space-y-8">
        <DashboardOverview />
        <ZapsList />
      </div>

        </div>
    )
}

export default Dashboard