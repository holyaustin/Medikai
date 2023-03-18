import {Table} from "web3uikit"

export default function NoFiles({customText}) {
    let additionalText
    if(customText === "Accident"){
        additionalText="s "
    }else if(customText === "Vaccination"){
        additionalText=" "
    }else if(customText === "Chronic" || customText === "Acute"){
        additionalText=" Illness"
    }
    return (
        <div className="mx-auto">
            <Table
                columnsConfig="80px 2fr 2fr 2fr 80px"
                customNoDataText={`No Medical Reports related to ${customText}${additionalText} are available. If you're sure then reloading the page might help.`}
                data={[]}
                header={[
                    "",
                    <span></span>,
                    <span className="md:ml-20">No Files</span>,
                    <span></span>,
                    <span></span>,
                    "",
                ]}
                // maxPages={3}
                // onPageNumberChanged={function noRefCheck() {}}
                // onRowClick={function noRefCheck() {}}
                // pageSize={5}
            />
        </div>
    )
}
