import ListFile from "./ListFile"
import { TabList, Tab } from "web3uikit"

export default function ListMedicalFiles({
    vaccinationHash,
    chronicHash,
    accidentHash,
    acuteHash,
}) {
    // console.log("vaccination hash : ", vaccinationHash)
    // console.log("chronic hash : ", chronicHash)
    // console.log("accident hash : ", accidentHash)
    // console.log("acute hash : ", acuteHash)
    return (
        <div>
            <div className="mt-5">
                <TabList
                    isWidthAuto
                    onChange={function noRefCheck() {}}
                    tabStyle="bulbUnion"
                >
                    <Tab lineHeight={25} tabKey={1} tabName="Vaccination">
                        <div>
                            <ListFile
                                fileMetadataHash={[...vaccinationHash]}
                                customText="Vaccination"
                                haveFiles={vaccinationHash.length > 0}
                            />
                        </div>
                    </Tab>
                    <Tab lineHeight={25} tabKey={2} tabName="Chronic">
                        <div>
                            <ListFile
                                fileMetadataHash={[[...chronicHash]]}
                                customText="Chronic"
                                haveFiles={chronicHash.length > 0}
                            />
                        </div>
                    </Tab>
                    <Tab lineHeight={25} tabKey={3} tabName="Accidental">
                        <div>
                            <ListFile
                                fileMetadataHash={[...accidentHash]}
                                customText="Accident"
                                haveFiles={accidentHash.length > 0}
                            />
                        </div>
                    </Tab>
                    <Tab lineHeight={25} tabKey={4} tabName="Acute">
                        <div>
                            <ListFile
                                fileMetadataHash={[...acuteHash]}
                                customText="Acute"
                                haveFiles={acuteHash.length > 0}
                            />
                        </div>
                    </Tab>
                </TabList>
            </div>
        </div>
    )
}
