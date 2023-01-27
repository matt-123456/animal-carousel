export const fetcher = (...args: [RequestInfo, RequestInit?]) =>
  fetch(...args).then((res) => res.json());

export const arrayFetcher = (urlArray: string[]) => {
  return Promise.all(
    urlArray.map((url) => fetch(url).then((res) => res.json()))
  );
};

export const shuffle = <T>(array: T[]): T[] => {
  if (!array) return array;

  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};
