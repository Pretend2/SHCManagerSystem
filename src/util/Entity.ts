interface Owner {
    /** 业主id */
    id: Number
    /** 业主名称 */
    name: String
    /** 性别 */
    gender: 0 | 1
    /** 年龄 */
    age: Number
    /** 电话 */
    phone?: String
    /** 身份证号 */
    idCard: String
    /** 微信 */
    weCat?: String
    /** 备注 */
    remark?: String
    /** 是否是业主的子成员 */
    isMember: 0 | 1
    /** 主业主的owner_no */
    memberNo?: String
}