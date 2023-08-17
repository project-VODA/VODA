// theme.ts

export const SimpleTheme = {
  body: '#001D3D',
  text: '#FFC300',
  toggleBackground: '#3b3b3b',
  mainColor: '#fcfcfc',
  navbar: '#3b3b3b',
};

export const DetailTheme = {
  body: '#ffffff',
  text: '#001D3D',
  toggleBackground: '#fcfcfc',
  mainColor: '#e6328d',
  navbar: '#fcfcfc',  // #FFD60A - 노랑
};


export type Theme = typeof SimpleTheme;
