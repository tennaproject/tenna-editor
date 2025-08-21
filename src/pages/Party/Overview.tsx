import {
  Card,
  Checkbox,
  Grid,
  Heading,
  HelpTip,
  InlineGroup,
  Section,
} from '@components';
import { useSave, useUi } from '@store';
import { characterHelpers } from '@utils';

export const Overview = () => {
  const saveFile = useSave((s) => s.saveFile);
  const allowNonStandardParty = useUi((s) => s.allowNonStandardParty);
  const setAllowNonStandardParty = useUi((s) => s.setAllowNonStandardParty);

  return (
    <div className="page">
      <InlineGroup>
        <Checkbox
          label="Allow non-standard party combinations"
          checked={allowNonStandardParty}
          onChange={(state) => setAllowNonStandardParty(state)}
        />
        <HelpTip title="Allow non-standard party combinations">
          <p>Enabling this allows you to set every character at every slot.</p>
          <p>
            The game isn't usually set up to handle this, so using it will
            usually lead to a lot of crashes.
          </p>
        </HelpTip>
      </InlineGroup>
      <Grid cols={3} className="gap-4">
        <Section id="slot1">
          <Card className="flex flex-col justify-center items-center gap-2">
            <div className="flex flex-col justify-center items-center gap-1">
              <Heading level={1}>1</Heading>
              <Heading level={5}>MEMBER</Heading>
            </div>
            <div>
              <Heading level={3} className="uppercase">
                {saveFile?.party?.[0] != null
                  ? characterHelpers.getById(
                      saveFile.party[0] as Parameters<
                        typeof characterHelpers.getById
                      >[0],
                    ).displayName
                  : 'None'}
              </Heading>
            </div>
          </Card>
        </Section>
        <Section id="slot2">
          <Card className="flex flex-col justify-center items-center gap-2">
            <div className="flex flex-col justify-center items-center gap-1">
              <Heading level={1}>2</Heading>
              <Heading level={5}>MEMBER</Heading>
            </div>
            <div>
              <Heading level={3} className="uppercase">
                {saveFile?.party?.[0] != null
                  ? characterHelpers.getById(
                      saveFile.party[1] as Parameters<
                        typeof characterHelpers.getById
                      >[0],
                    ).displayName
                  : 'None'}
              </Heading>
            </div>
          </Card>
        </Section>
        <Section id="slot3">
          <Card className="flex flex-col justify-center items-center gap-2">
            <div className="flex flex-col justify-center items-center gap-2">
              <Heading level={1}>3</Heading>
              <Heading level={5}>MEMBER</Heading>
            </div>
            <div>
              <Heading level={3} className="uppercase">
                {saveFile?.party?.[2] != null
                  ? characterHelpers.getById(
                      saveFile.party[2] as Parameters<
                        typeof characterHelpers.getById
                      >[0],
                    ).displayName
                  : 'None'}
              </Heading>
            </div>
          </Card>
        </Section>
      </Grid>
    </div>
  );
};
