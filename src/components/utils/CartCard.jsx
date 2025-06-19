import React from 'react';
import PrimaryBtn from '../ui/PrimaryBtn';
import VerticalSeparator from './VerticalSeparator';
import { deleteIcon, editicon } from '../../../imagesPath';
import { fontMedium } from './fontMedium';

const tableHeadingStyle = `text-base-50 text-[12px] mb-1 whitespace-nowrap ${fontMedium}`;
const tableRowStyle = `text-base text-[14px] whitespace-nowrap ${fontMedium}`;

function CartCard({ item, onDelete, onEdit, showEdit = true, showDelete = true }) {
  const fields = item.fields || [];

  return (
    <div className="rounded-xl border bg-white px-6 py-4 shadow-sm lg:mb-6">
      {/* Top Section */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img src={item.icon} alt={item.title} className="h-10 w-10" />
          <h2 className={`text-[18px] ${fontMedium}`}>{item.title}</h2>
        </div>

        <div className="flex items-center gap-4">
          <p className={`${fontMedium} text-[20px] font-extrabold`}>
            <span className="text-[14px] text-base-50 mr-1">$</span>
            {(item.price ?? 0).toFixed(2)}
          </p>

          {(showEdit || showDelete) && <VerticalSeparator />}

          {/* ✅ Edit Button */}
          {showEdit && (
            <PrimaryBtn
              onClick={onEdit}
              className="px-[0] bg-transparent"
              iconLeft={editicon}
            />
          )}

          {/* ✅ Delete Button */}
          {showDelete && (
            <PrimaryBtn
              onClick={onDelete}
              className="px-[0] bg-transparent"
              iconLeft={deleteIcon}
            />
          )}
        </div>
      </div>

      {/* Table Section */}
      {fields.length > 0 && (
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full table-auto border-t border-gray-200 pt-3">
            <thead>
              <tr>
                {fields.map((field, index) => (
                  <th key={index} className={`text-left px-2 py-2 ${tableHeadingStyle}`}>
                    {field.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {fields.map((field, index) => (
                  <td key={index} className={`px-2 py-2 ${tableRowStyle}`}>
                    {field.render ? field.render(field.value) : field.value ?? '-'}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CartCard;
