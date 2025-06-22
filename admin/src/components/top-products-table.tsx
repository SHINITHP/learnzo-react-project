import type { TopProductsTableProps } from "@/types";
import { PencilLine, Star, Trash } from "lucide-react";


const TopProductsTable: React.FC<TopProductsTableProps> = ({ products }) => {
  return (
    <div className="card-body p-0 dark:bg-slate-900">
      <div className="relative h-[500px] w-full overflow-auto">
        <table className="table">
          <thead className="table-header">
            <tr className="table-row">
              <th className="table-head">#</th>
              <th className="table-head">Product</th>
              <th className="table-head">Price</th>
              <th className="table-head">Status</th>
              <th className="table-head">Rating</th>
              <th className="table-head">Actions</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {products.map((product) => (
              <tr key={product.number} className="table-row">
                <td className="table-cell">{product.number}</td>
                <td className="table-cell">
                  <div className="flex gap-x-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="size-14 rounded-lg object-cover"
                    />
                    <div className="flex flex-col">
                      <p>{product.name}</p>
                      <p className="text-slate-600 dark:text-slate-400">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="table-cell">${product.price}</td>
                <td className="table-cell">{product.status}</td>
                <td className="table-cell">
                  <div className="flex items-center gap-x-2">
                    <Star
                      className="fill-yellow-600 stroke-yellow-600"
                      size={18}
                    />
                    {product.rating}
                  </div>
                </td>
                <td className="table-cell">
                  <div className="flex items-center gap-x-4">
                    <button className="text-blue-500 dark:text-blue-600">
                      <PencilLine size={20} />
                    </button>
                    <button className="text-red-500">
                      <Trash size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopProductsTable;
