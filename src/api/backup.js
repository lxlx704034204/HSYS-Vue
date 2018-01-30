
/**
 * 资讯中心数据
 * @param params
 * @returns {*}
 */
export const mationcontent = params => {
    return axios.get(`${base}/api/mock/information`, { params: params }).then(res => res.data.data.Recom);
}
