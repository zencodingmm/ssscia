import {create} from 'zustand';



export type AuthStore = {
  loggedIn: boolean;
  userEmail: string;
  userID: string,
  memberID: string,
  adminLoggedIn: boolean,
  isMember: boolean,
  coordinates: string,
  setEmail: (email: string) => void;
  setLoggedIn: (status: boolean) => void;
  setAdminLoggedIn: (status: boolean) => void,
  polygons: string,
  setPolygons: (polygons: number[][]) => void;
  setUserID: (id: string) => void;
  setMemberID: (id: string) => void;
  addPolygon: (polygon: number[][]) => void;
  setIsMember: (status: boolean) => void;
  setCoordinates: (coords: string) => void;
};

const useAuthStore = create<AuthStore>((set) => ({
  loggedIn: false,
  userEmail: "",
  adminLoggedIn: false,
  polygons: "",
  userID: "",
  memberID: "",
  isMember: false,
  coordinates: "",
  setEmail: (email) => set((state) => ({...state, userEmail: email})),
  setLoggedIn: (status: boolean) => set((state) => ({...state, loggedIn: status })),
  setAdminLoggedIn: (status: boolean) => set((state) => ({...state, adminLoggedIn: status})),
  setPolygons: () => set((state) => ({...state, polygons: ""})),
  addPolygon: (polygon) => set((state) => ({...state, polygons: state.polygons + "," + polygon })),
  setUserID: (id) => set((state) => ({...state, userID: id})),
  setMemberID: (id) => set((store) => ({...store, memberID: id})),
  setIsMember: (status) => set((store) => ({...store, isMember: status})),
  setCoordinates: (coords) => set((store) => ({...store, coordinates: coords}))
}));

export default useAuthStore;
