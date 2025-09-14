import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { STORE_NAMESPACE } from './schema';
import { createDebouncedJSONStorage } from 'zustand-debounce';

export const UI_VERSION = 2;

export interface Ui {
  devmode: boolean;
  uploadedSaves: number;
  sidebar: {
    open: boolean;
    retracted: boolean;
  };
  party: {
    allowNonStandardParty: boolean;
    kris: {
      allowAllElements: boolean;
    };
    susie: {
      allowAllElements: boolean;
    };
    ralsei: {
      allowAllElements: boolean;
    };
    noelle: {
      allowAllElements: boolean;
    };
  };
  recruits: {
    showNonRecruitableEnemies: boolean;
  };
}

interface UiState {
  ui: Ui;
  updateUi: (updater: (draft: Ui) => void) => void;
}

export const useUi = create<UiState>()(
  persist(
    immer((set) => ({
      ui: {
        devmode: false,
        uploadedSaves: 1,
        sidebar: {
          open: false,
          retracted: false,
        },
        party: {
          allowNonStandardParty: false,
          kris: {
            allowAllElements: false,
          },
          susie: {
            allowAllElements: false,
          },
          ralsei: {
            allowAllElements: false,
          },
          noelle: {
            allowAllElements: false,
          },
        },
        recruits: {
          showNonRecruitableEnemies: false,
        },
      },

      updateUi: (updater: (draft: Ui) => void) =>
        set((state) => {
          updater(state.ui);
        }),
    })),
    {
      name: `${STORE_NAMESPACE}-ui`,
      storage: createDebouncedJSONStorage('localStorage', {
        debounceTime: 1000,
      }),
      partialize: (state) => ({
        ui: state.ui,
      }),
      version: UI_VERSION,
      migrate: (state, version) => {
        if (version === 1) {
          interface UiStoreV1 {
            isSidebarRetracted?: boolean;
            allowKrisAllElements?: boolean;
            allowSusieAllElements?: boolean;
            allowRalseiAllElements?: boolean;
            allowNoelleAllElements?: boolean;
            devmode?: boolean;
            allowNonStandardParty?: boolean;
            showNonRecruitableEnemies?: boolean;
            totalUploaded?: number;
          }

          const {
            isSidebarRetracted,
            allowKrisAllElements,
            allowSusieAllElements,
            allowRalseiAllElements,
            allowNoelleAllElements,
            devmode,
            allowNonStandardParty,
            showNonRecruitableEnemies,
            totalUploaded,
          } = state as UiStoreV1;

          const stateV2 = {
            ui: {
              devmode: devmode ?? false,
              uploadedSaves: totalUploaded ?? 1,
              sidebar: {
                open: false,
                retracted: isSidebarRetracted ?? false,
              },
              party: {
                allowNonStandardParty: allowNonStandardParty ?? false,
                kris: {
                  allowAllElements: allowKrisAllElements ?? false,
                },
                susie: {
                  allowAllElements: allowSusieAllElements ?? false,
                },
                ralsei: {
                  allowAllElements: allowRalseiAllElements ?? false,
                },
                noelle: {
                  allowAllElements: allowNoelleAllElements ?? false,
                },
              },
              recruits: {
                showNonRecruitableEnemies: showNonRecruitableEnemies ?? false,
              },
            },
          };

          return stateV2;
        }
      },
    },
  ),
);
