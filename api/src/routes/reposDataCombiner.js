const reposDataCombiner = (localRepoData, apiRepoData) => {
    const concatinated = apiRepoData.concat(localRepoData.default);
    const filteredArray = concatinated.filter(e => {
        return e.fork === false;
    })
    return filteredArray;
};

export default reposDataCombiner;