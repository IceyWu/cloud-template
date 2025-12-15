import { defineStore } from "pinia";
import type { UserResult } from "@/api/mock";
import { getLogin, refreshTokenApi } from "@/api/mock";
import type { DataInfo } from "@/utils/auth";
import { AccessTokenKey, ExpiresKey, RefreshTokenKey, removeToken, setToken } from "@/utils/auth";

export const useUserStore = defineStore(
  "lp-user",
  () => {
    const username = ref("");
    const userInfo = ref({});
    const roles = ref<string[]>([]);

    const SET_USERNAME = (name: string) => {
      username.value = name;
    };

    const SET_ROLES = (rolesData: string[]) => {
      roles.value = rolesData;
    };

    const SET_USERINFO = (data: any) => {
      userInfo.value = data;
    };

    const loginByUsername = (dataT: any) => {
      return new Promise<UserResult>((resolve, reject) => {
        getLogin(dataT)
          .then((res) => {
            const { code, data } = res as any;
            if (code === 200) {
              const { admin, token } = data;
              const TokenInfo: DataInfo<number> = {
                username: admin.name,
                roles: [admin.name],
                accessToken: token[AccessTokenKey],
                refreshToken: token[RefreshTokenKey],
                expires: token[ExpiresKey] * 1000,
              };
              setToken(TokenInfo, "a");
              resolve(res);
            } else {
              reject(res);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    };

    const logOut = () => {
      username.value = "";
      roles.value = [];
      removeToken();
    };

    const handRefreshToken = (data: any) => {
      return new Promise<any>((resolve, reject) => {
        refreshTokenApi(data)
          .then((res) => {
            if (res) {
              setToken((res as any).data);
              resolve(res);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    };

    return {
      username,
      userInfo,
      roles,
      SET_USERNAME,
      SET_ROLES,
      SET_USERINFO,
      loginByUsername,
      logOut,
      handRefreshToken,
    };
  },
  {
    persist: {
      key: "pure-user-key",
      // storage: storageSession as StorageLike
    },
  }
);
