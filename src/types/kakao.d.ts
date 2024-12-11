interface KakaoLatLng {
  getLat(): number;
  getLng(): number;
  equals(latlng: KakaoLatLng): boolean;
  toString(): string;
}

interface KakaoMap {
  setCenter(latlng: KakaoLatLng): void;
  getLevel(): number;
  setLevel(level: number): void;
}

interface KakaoMarker {
  setMap(map: KakaoMap | null): void;
  getPosition(): KakaoLatLng;
  setPosition(position: KakaoLatLng): void;
  setImage(image: any): void;
  setDraggable(draggable: boolean): void;
  setClickable(clickable: boolean): void;
  setZIndex(zIndex: number): void;
  setOpacity(opacity: number): void;
  setTitle(title: string): void;
}

interface KakaoMaps {
  load(callback: () => void): void;
  services: {
    Geocoder: new () => {
      addressSearch(address: string, callback: (result: any[], status: string) => void): void;
    };
    Status: {
      OK: string;
    };
  };
  Map: new (container: HTMLElement, options: { center: KakaoLatLng; level: number }) => KakaoMap;
  LatLng: new (lat: number, lng: number) => KakaoLatLng;
  Marker: new (options: {
    position: KakaoLatLng;
    map?: KakaoMap;
    image?: any;
    title?: string;
    draggable?: boolean;
    clickable?: boolean;
    zIndex?: number;
    opacity?: number;
    altitude?: number;
    range?: number;
  }) => KakaoMarker;
  event: {
    addListener(target: KakaoMap | KakaoMarker, type: string, handler: (...args: any[]) => void): void;
    removeListener(target: KakaoMap | KakaoMarker, type: string, handler: (...args: any[]) => void): void;
    trigger(target: KakaoMap | KakaoMarker, type: string, data?: any): void;
  };
}

declare global {
  interface Window {
    kakao: {
      maps: KakaoMaps;
    };
  }
}
