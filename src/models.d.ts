interface contactModel {
  tel: string,
  email: string
}

interface companyInfo {
  capital: number,
  contact: contactModel
}

interface companyModel {
  id: number,
  name: string,
  createdAt: string,
  updatedAt: string,
  companyInfo: companyInfo
}

interface profileModel {
  profileImageUrl: string,
  company: companyModel
}

export interface userModel {
  id: number,
  name: string,
  createdAt: string,
  updatedAt: string,
  profile: profileModel
}
