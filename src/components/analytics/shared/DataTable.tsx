import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export interface Column {
  key: string;
  label: string;
  align?: 'left' | 'right';
  format?: (value: any) => string;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  title?: string;
  viewAllText?: string;
  avatarKey?: string;
  nameKey?: string;
  usernameKey?: string;
}

export function DataTable({ columns, data, title, viewAllText, avatarKey, nameKey, usernameKey }: DataTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = data.filter(item => 
    item[nameKey].toLowerCase().includes(searchQuery.toLowerCase()) ||
    item[usernameKey].toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const gridTemplateColumns = columns.map(col => 
    col.key === nameKey ? '2fr' : '1fr'
  ).join(' ');

  return (
    <Card className="p-6">
      {(title || viewAllText) && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">{title}</h2>
          {viewAllText && (
            <button className="text-sm font-medium text-[#FF0000] hover:text-red-700">
              {viewAllText}
            </button>
          )}
        </div>
      )}

      <div className="mb-4">
        <Input
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="max-w-sm"
        />
      </div>

      <div className="grid gap-4 py-3 px-4 bg-gray-50 rounded-t-lg text-sm font-medium" style={{ gridTemplateColumns }}>
        {columns.map(column => (
          <div key={column.key} className={column.align === 'right' ? 'text-right' : ''}>
            {column.label}
          </div>
        ))}
      </div>
      
      <div className="divide-y divide-gray-100">
        {paginatedData.map((item, index) => (
          <div
            key={index}
            className="grid gap-4 items-center py-4 px-4 hover:bg-gray-50 transition-colors"
            style={{ gridTemplateColumns }}
          >
            {columns.map(column => {
              if (column.key === nameKey && avatarKey && usernameKey) {
                return (
                  <div key={column.key} className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={item[avatarKey]} />
                      <AvatarFallback>{item[nameKey][0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{item[nameKey]}</p>
                      <p className="text-sm text-muted-foreground">{item[usernameKey]}</p>
                    </div>
                  </div>
                );
              }

              return (
                <div 
                  key={column.key} 
                  className={`${column.align === 'right' ? 'text-right' : ''} font-medium`}
                >
                  {column.format ? column.format(item[column.key]) : item[column.key]}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="flex items-center justify-between py-4 px-4 border-t mt-4">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length}
          </div>
          <div className="flex items-center gap-2">
            <button
              className="p-2 hover:bg-gray-100 rounded-md text-muted-foreground disabled:opacity-50"
              onClick={() => setCurrentPage(p => p - 1)}
              disabled={currentPage === 1}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="p-2 hover:bg-gray-100 rounded-md text-muted-foreground disabled:opacity-50"
              onClick={() => setCurrentPage(p => p + 1)}
              disabled={currentPage === totalPages}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </Card>
  );
}