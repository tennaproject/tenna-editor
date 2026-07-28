import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { STORE_NAMESPACE } from './schema';
import { createDebouncedJSONStorage } from 'zustand-debounce';

export const UI_VERSION = 8;

export type UiLocale = 'en' | 'ko' | 'it';

export interface Ui {
  locale: UiLocale;
  devmode: boolean;
  uploadedSaves: number;
  sidebar: {
    open: boolean;
    retracted: boolean;
  };
  home: {
    allowAllSaves: boolean;
    showDogcheckedRooms: boolean;
    allowManualPlotEntry: boolean;
  };
  party: {
    allowNonStandardParty: boolean;
    kris: {
      allowAllElements: boolean;
      preserveCustomStats: boolean;
    };
    susie: {
      allowAllElements: boolean;
      preserveCustomStats: boolean;
    };
    ralsei: {
      allowAllElements: boolean;
      preserveCustomStats: boolean;
    };
    noelle: {
      allowAllElements: boolean;
      preserveCustomStats: boolean;
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
        locale: 'en',
        devmode: false,
        uploadedSaves: 1,
        sidebar: {
          open: false,
          retracted: false,
        },
        home: {
          allowAllSaves: false,
          showDogcheckedRooms: false,
          allowManualPlotEntry: false,
        },
        party: {
          allowNonStandardParty: false,
          kris: {
            allowAllElements: false,
            preserveCustomStats: false,
          },
          susie: {
            allowAllElements: false,
            preserveCustomStats: false,
          },
          ralsei: {
            allowAllElements: false,
            preserveCustomStats: false,
          },
          noelle: {
            allowAllElements: false,
            preserveCustomStats: false,
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
        let nextState = state;

        if (version < 2) {
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

          nextState = {
            ui: {
              devmode: devmode ?? false,
              locale: 'en',
              uploadedSaves: totalUploaded ?? 1,
              sidebar: {
                open: false,
                retracted: isSidebarRetracted ?? false,
              },
              home: {
                allowAllSaves: false,
                showDogcheckedRooms: false,
                allowManualPlotEntry: false,
              },
              party: {
                allowNonStandardParty: allowNonStandardParty ?? false,
                kris: {
                  allowAllElements: allowKrisAllElements ?? false,
                  preserveCustomStats: false,
                },
                susie: {
                  allowAllElements: allowSusieAllElements ?? false,
                  preserveCustomStats: false,
                },
                ralsei: {
                  allowAllElements: allowRalseiAllElements ?? false,
                  preserveCustomStats: false,
                },
                noelle: {
                  allowAllElements: allowNoelleAllElements ?? false,
                  preserveCustomStats: false,
                },
              },
              recruits: {
                showNonRecruitableEnemies: showNonRecruitableEnemies ?? false,
              },
            },
          };
        }

        if (version < 3) {
          const current = nextState as { ui: Partial<Ui> };
          if (current.ui && !current.ui.home) {
            current.ui.home = {
              allowAllSaves: false,
              showDogcheckedRooms: false,
              allowManualPlotEntry: false,
            };
          }
        }

        if (version < 4) {
          const current = nextState as { ui: Partial<Ui> };
          if (current.ui?.home) {
            current.ui.home.showDogcheckedRooms ??= false;
          }
        }

        if (version < 5) {
          const current = nextState as { ui: Partial<Ui> };
          if (current.ui) {
            current.ui.locale ??= 'en';
          }
        }

        if (version < 6) {
          const current = nextState as { ui: Partial<Ui> };
          if (current.ui?.home) {
            current.ui.home.allowManualPlotEntry ??= false;
          }
        }

        if (version < 7) {
          const current = nextState as { ui: Partial<Ui> };
          if ((current.ui.locale as string) === 'ja') {
            current.ui.locale = 'en';
          }
        }

        if (version < 8) {
          const current = nextState as { ui: Partial<Ui> };
          if (current.ui?.party) {
            current.ui.party.kris.preserveCustomStats = false;
            current.ui.party.susie.preserveCustomStats = false;
            current.ui.party.ralsei.preserveCustomStats = false;
            current.ui.party.noelle.preserveCustomStats = false;
          }
        }

        return nextState;
      },
    },
  ),
);
