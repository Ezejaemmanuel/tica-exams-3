import React, { Suspense } from 'react'
import PaymentProofsList from './aside'
import PaymentProofsSkeleton from './skeleton'

const PaymentProofsListPage = () => {
    return (
        <Suspense fallback={<PaymentProofsSkeleton />}>
            <PaymentProofsList />
        </Suspense>
    )
}

export default PaymentProofsListPage;