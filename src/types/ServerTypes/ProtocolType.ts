
export interface ProtocolDataObject {
    data: DataType[]
    meta: MetaType
};

export type DataType = {
    id: string,
    createdAt: string,
    files: Array<FileType>,
    protocolType: string,
    robotType: string,
    metadata: MetaData,
    analyses: Array<any>
    analysisSummaries: SummaryType[]
    key: string
}

export type FileType = {
    name: string,
    role: string
}

export type MetaData = {
    apiLevel?: string
    author? : string
    created?: number
    tags? : string[]
    description? : string
    protocolName? : string
    lastModified?: number
}

export type MetaType = {
    cursor: number,
    totalLength: number
}

export type SummaryType = {
    id: string,
    status: string
}