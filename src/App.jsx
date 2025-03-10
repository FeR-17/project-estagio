import React, { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { ProductList } from './components/ProductList';
import { ProductForm } from './components/ProductForm';
import { SearchFilters } from './components/SearchFilters';

function App() {
  const [products, setProducts] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
  });

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesCategory = !filters.category || product.category === filters.category;

      return matchesSearch && matchesCategory;
    });
  }, [products, filters]);

  const handleAddProduct = (data) => {
    const newProduct = {
      ...data,
      id: Date.now().toString(),
      lastUpdated: new Date(),
    };
    setProducts([...products, newProduct]);
    setIsFormOpen(false);
  };

  const handleEditProduct = (data) => {
    if (editingProduct) {
      const updatedProducts = products.map((p) =>
        p.id === editingProduct.id
          ? { ...p, ...data, lastUpdated: new Date() }
          : p
      );
      setProducts(updatedProducts);
      setEditingProduct(null);
    }
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold leading-tight text-gray-900">
                Gestão de Números
              </h1>
              <button
                onClick={() => setIsFormOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Plus className="h-5 w-5 mr-2" />
                Adicionar número
              </button>
            </div>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
              {(isFormOpen || editingProduct) && (
                <div className="mb-8 bg-white shadow rounded-lg p-6">
                  <h2 className="text-lg font-medium mb-4">
                    {editingProduct ? 'Editar Número' : 'Adicionar Novo Número'}
                  </h2>
                  <ProductForm
                    product={editingProduct}
                    onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
                    onCancel={() => {
                      setIsFormOpen(false);
                      setEditingProduct(null);
                    }}
                  />
                </div>
              )}
              
              {products.length > 0 && (
                <SearchFilters 
                  filters={filters}
                  onFilterChange={handleFilterChange}
                />
              )}

              {filteredProducts.length > 0 ? (
                <ProductList
                  products={filteredProducts}
                  onEdit={setEditingProduct}
                  onDelete={handleDeleteProduct}
                />
              ) : (
                <div className="text-center py-12">
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    {products.length === 0 ? "" : ""}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {products.length === 0 
                      ? ""
                      : ""}
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;