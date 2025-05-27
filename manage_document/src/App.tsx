import React, { useState } from 'react'
import DocumentTable from './components/DocumentTable'
import DocumentDetailTable from './components/DocumentDetailTable'
import Sidebar from './components/Sidebar'

function App() {
  const [page, setPage] = useState<'document' | 'detail'>('document')

  return (
    <div className="flex min-h-screen">
      <Sidebar active={page} onSelect={setPage} />
      <div className="flex-1 bg-gray-50 p-4">
        <h1 className="text-2xl font-bold mb-4">
          {page === 'document' ? 'Manage Document' : 'Manage Document Detail'}
        </h1>
        {page === 'document' ? <DocumentTable /> : <DocumentDetailTable />}
      </div>
    </div>
  )
}

export default App 