import React from "react";

const TableList = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-md">
        <thead>
          <tr>
            <th>Sel</th>
            <th>Worker</th>
            <th>Status</th>
            <th>Sync Quickbook</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>
              <input type="checkbox" defaultChecked className="checkbox" />
            </th>
            <td>Cy Ganderton</td>
            <td>Quality Control Specialist</td>
            <td>
              <input type="checkbox" defaultChecked className="checkbox" />
            </td>
            <td>
              <button className="underline border-dashed">Eliminar</button>
            </td>
            <td>
              <button className="underline border-dashed">Editar</button>
            </td>
            <td>
              <button className="underline border-dashed">Pdf</button>
            </td>
            <td>
              <button className="underline border-dashed">Imprimir</button>
            </td>
          </tr>
          <tr>
            <th>2</th>
            <td>Hart Hagerty</td>
            <td>Desktop Support Technician</td>
            <td>Zemlak, Daniel and Leannon</td>
            <td>United States</td>
            <td>12/5/2020</td>
            <td>Purple</td>
          </tr>
          <tr>
            <th>3</th>
            <td>Brice Swyre</td>
            <td>Tax Accountant</td>
            <td>Carroll Group</td>
            <td>China</td>
            <td>8/15/2020</td>
            <td>Red</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableList;
