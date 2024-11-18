import { messages } from "../../helpers/summaryMessages";

export default function SummMessages({ formData }) {
  if (
    !formData ||
    !formData.rythmOfLife ||
    !formData.habits ||
    !formData.sleepTime ||
    !formData.waterBalance
  ) {
    return null;
  }

  const keys = {
    rythmOfLife: Object.keys(formData.rythmOfLife)[0],
    habits: Object.keys(formData.habits)[0],
    sleepTime: Object.keys(formData.sleepTime)[0],
    waterBalance: Object.keys(formData.waterBalance)[0],
  };

  const colors = ["bg-[#E2EBC8]", "bg-[#FFC5DD]", "bg-[#D9EDFF]"];

  return (
    <>
      {Object.values(keys).some((selectedKey) => selectedKey) ? (
        <div className="flex flex-col gap-3">
          {Object.entries(keys).map(
            ([key, selectedKey], index) =>
              selectedKey && (
                <div
                  className={`py-5 px-4 rounded-[14px] ${
                    colors[index % colors.length]
                  }`}
                  key={key}
                >
                  <p
                    className="text-left text-xs"
                    dangerouslySetInnerHTML={{
                      __html: messages[key][selectedKey],
                    }}
                  />
                </div>
              )
          )}
        </div>
      ) : null}
    </>
  );
}
