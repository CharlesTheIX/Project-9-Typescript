import Link from "next/link";
import { Fragment } from "react";
import Edit_SVG from "@/SVGs/Edit_SVG";
import Copy_SVG from "@/SVGs/Copy_SVG";
import Profile_SVG from "@/SVGs/Profile_SVG";
import Pin_SVG from "@/components/SVGs/Pin_SVG";
import getUserById from "@/lib/users/getUserById";
import { useUserContext } from "@/contexts/userContext";
import { useToastContext } from "@/contexts/toastContext";
import copyContentToClipboard from "@/lib/copyContentToClipboard";
import { useImpersonationContext } from "@/contexts/impersonationContext";

type Props = {
  tableData: any[];
  pinnedTableData: any[];
  tableHeaders: TableHeader[];
  collection?: "countries" | "users";
  setPinnedTableData: React.Dispatch<React.SetStateAction<any[]>>;
};

const TableBody: React.FC<Props> = (props: Props) => {
  const { tableData, tableHeaders, collection, pinnedTableData, setPinnedTableData } = props;
  const toast = useToastContext();
  const { userRole } = useUserContext();
  const impersonation = useImpersonationContext();

  const copyContent = async (content: string): Promise<void> => {
    try {
      const copyContentResponse = await copyContentToClipboard(content);
      if (copyContentResponse.error) throw new Error(copyContentResponse.message);

      toast.setHidden(false);
      toast.setType("success");
      toast.setTitle("Copied to clipboard");
      toast.setContent(copyContentResponse.message);
    } catch (error: any) {
      toast.setHidden(false);
      toast.setType("error");
      toast.setTitle("Copy failed");
      toast.setContent(error.message);
    }
  };

  return (
    <tbody>
      {tableData.map((item: any, key: number) => {
        const isPinned = pinnedTableData.find((data: any) => data._id === item._id);

        return (
          <tr key={key} className={`${isPinned ? "pinned" : ""}`}>
            {tableHeaders.map((header: TableHeader, key: number) => {
              if (header.hidden) return <Fragment key={key} />;

              if (header.dataType === "pin") {
                return (
                  <td key={key} className="relative p-2">
                    <p
                      className="pin gap-10 flex flex-row justify-center"
                      onClick={() => {
                        if (isPinned) {
                          const newData = pinnedTableData.filter((data: any) => data._id !== item._id);
                          setPinnedTableData(newData);
                          return;
                        }

                        setPinnedTableData((prevValue: any[]) => [...prevValue, item]);
                      }}
                    >
                      <Pin_SVG />
                    </p>
                  </td>
                );
              }

              if (header.dataType === "edit") {
                return (
                  <td key={key} className="relative p-2">
                    <p className="edit gap-10 flex flex-row justify-center">
                      {collection === "users" ? (
                        <Link href={`/admin/${collection}/${item._id}`} className="inline-block z-10">
                          <Edit_SVG />
                        </Link>
                      ) : (
                        <Link href={`/admin/${collection}/edit/${item._id}`} className="inline-block z-10">
                          <Edit_SVG />
                        </Link>
                      )}
                    </p>
                  </td>
                );
              }

              if (header.dataType === "impersonate") {
                return (
                  <td key={key} className="relative p-2 text-center">
                    <p
                      className="impersonate inline-block z-10 gap-10 flex flex-row justify-center"
                      onClick={async () => {
                        try {
                          const response = await getUserById(item._id);
                          if (response.error) throw new Error(response.message);
                          impersonation.impersonate(response.data, "/dashboard");
                        } catch (error: any) {
                          toast.setHidden(false);
                          toast.setType("error");
                          toast.setContent(error.message);
                          toast.setTitle("Impersonation Failed");
                        }
                      }}
                    >
                      <Profile_SVG />
                    </p>
                  </td>
                );
              }

              if (!item[header.value]) {
                return (
                  <td key={key} className="text-center p-2">
                    -
                  </td>
                );
              }

              if (!header.roles || header.roles.length === 0 || header.roles.includes(userRole)) {
                return (
                  <td key={key} className="relative p-2">
                    {collection === "users" ? (
                      <Link className="link-wrapper" href={`/admin/${collection}/${item._id}`} />
                    ) : (
                      <Link className="link-wrapper" href={`/${collection}/${item._id}`} />
                    )}

                    <p className="gap-10 flex flex-row justify-between">
                      <span className="overflow-hidden">{item[header.value]}</span>
                      <span
                        className="z-10 overflow-hidden"
                        onClick={async () => {
                          if (!header.canCopy) return;
                          await copyContent(item[header.value]);
                        }}
                      >
                        {header.canCopy && <Copy_SVG />}
                      </span>
                    </p>
                  </td>
                );
              }

              return <Fragment key={key} />;
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
