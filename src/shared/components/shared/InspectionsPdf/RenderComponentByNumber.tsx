import React from "react";
import LiftgateInspectionCheckList, {
  IInspectionDetail,
} from "@/shared/components/shared/InspectionsPdf/LiftgateInspectionCheckList";
import { LiftgateInspection } from "@/shared/types/order/ITypes";
import ChassisAnnualInspectionReport from "./ChassisAnnualInspectionReport";

interface RenderProps {
  data: LiftgateInspection;
  inspectionDetails: IInspectionDetail[];
  isEditable: boolean;
}

const RenderComponentByNumber = (
  num: number,
  props: RenderProps
): React.ReactNode => {
  const componentMap: Record<number, (props: RenderProps) => React.ReactNode> =
    {
      7: ({ data, inspectionDetails, isEditable }) => (
        <LiftgateInspectionCheckList
          data={data}
          inspectionDetails={inspectionDetails}
          isEditable={isEditable}
        />
      ),
      2: ({ data }) => <div>Otro componente usando {data.name}</div>,
      3: ({ data, inspectionDetails, isEditable }) => (
        <ChassisAnnualInspectionReport
          data={data}
          inspectionDetails={inspectionDetails}
          isEditable={isEditable}
        />
      ),
    };

  return (
    componentMap[num]?.(props) ?? (
      <pre className="text-center">
        There is no template assigned to the inspection
      </pre>
    )
  );
};

export default RenderComponentByNumber;
