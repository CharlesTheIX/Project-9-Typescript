import Link from "next/link";
import { Fragment } from "react";
import Edit_SVG from "../SVGs/Edit_SVG";
import Copy_SVG from "../SVGs/Copy_SVG";
import { TableHeader } from "./TableCore";
import Profile_SVG from "../SVGs/Profile_SVG";
import getUserById from "@/functions/users/getUserById";
import { useUserContext } from "@/contexts/userContext";
import { useToastContext } from "@/contexts/toastContext";
import copyContentToClipboard from "@/functions/copyContentToClipboard";
import { useImpersonationContext } from "@/contexts/impersonationContext";

type Props = {
  tableData: any[];
  tableHeaders: TableHeader[];
  collection?: "countries" | "users";
};

const TableBody: React.FC<Props> = (props: Props) => {
  const { tableData, tableHeaders, collection } = props;
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
        return (
          <tr key={key}>
            {tableHeaders.map((header: TableHeader, key: number) => {
              if (header.hidden) return <Fragment key={key} />;

              if (header.dataType === "edit") {
                return (
                  <td key={key} className="relative">
                    <p className="edit">
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
                  <td key={key} className="relative">
                    <p
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
                      className="impersonate inline-block z-10"
                    >
                      <Profile_SVG />
                    </p>
                  </td>
                );
              }

              if (!item[header.value]) {
                return (
                  <td key={key} className="text-center">
                    -
                  </td>
                );
              }

              if (!header.roles || header.roles.length === 0 || header.roles.includes(userRole)) {
                return (
                  <td key={key} className="relative">
                    {collection === "users" ? (
                      <Link className="link-wrapper" href={`/admin/${collection}/${item._id}`} />
                    ) : (
                      <Link className="link-wrapper" href={`/${collection}/${item._id}`} />
                    )}

                    <p>
                      <span>{item[header.value]}</span>
                      <span
                        className="z-10"
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
