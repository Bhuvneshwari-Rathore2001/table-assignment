import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { OverlayPanel } from 'primereact/overlaypanel';
import { useEffect, useRef, useState } from 'react';
import { IArtwork } from '../types/artwork';
import { IPaginator } from '../types/pagination';

const Table = () => {
  const [artworks, setArtworks] = useState<IArtwork[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<IPaginator>();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowClick, setRowClick] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<IArtwork[]>([]);
  const op = useRef(null);

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.artic.edu/api/v1/artworks?page=${page}`
      );
      const data = await res.json();

      if (res.status === 200) {
        setArtworks(data.data);
        setCurrentPage(data.pagination.current_page);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const onPageChange = (e) => {
    fetchData(e.page + 1);
  };

  return (
    <>
      <DataTable
        loading={loading}
        selectionMode={rowClick ? null : 'checkbox'}
        selection={selectedProducts}
        first={(currentPage - 1) * 12}
        lazy
        onSelectionChange={(e) => setSelectedProducts(e.value)}
        dataKey='id'
        onPage={onPageChange}
        value={artworks}
        paginator
        rows={12}
        totalRecords={pagination?.total || 126335}
        tableStyle={{ minWidth: '50rem' }}
      >
        <Column
          selectionMode='multiple'
          headerStyle={{ width: '3rem' }}
        ></Column>

        <Column
          // style={{ maxWidth: '4px' }}
          header={
            <>
              <div
                style={{
                  background: "url('/assets/chevronDown.png')",
                  height: '20px',
                  width: '20px',
                  backgroundSize: 'contain',
                  cursor: 'pointer',
                }}
                onClick={(e) => op.current.toggle(e)}
              ></div>

              <OverlayPanel
                ref={op}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '300px',
                  height: '250px',
                  padding: '10px',
                  gap: '20px',
                }}
              >
                <input
                  type='number'
                  onChange={() => {}}
                  placeholder='select rows...'
                  style={{ width: '100%', padding: '12px' }}
                />
                <button style={{ padding: '10px' }}>Submit</button>
              </OverlayPanel>
            </>
          }
          style={{ textAlign: 'center', width: '10%' }}
        ></Column>

        <Column field='title' header='Title' style={{ width: '20%' }}></Column>
        <Column
          field='place_of_origin'
          header='Place'
          style={{ width: '16%' }}
        ></Column>
        <Column
          field='artist_display'
          header='Artist'
          style={{ width: '20%' }}
        ></Column>
        <Column
          field='inscriptions'
          header='Inscriptions'
          style={{ width: '20%' }}
        ></Column>
        <Column
          field='date_start'
          header='Start-date'
          style={{ width: '10%' }}
        ></Column>
        <Column
          field='date_end'
          header='End-dste'
          style={{ width: '10%' }}
        ></Column>
      </DataTable>
    </>
  );
};

export default Table;
