import ThrashMachineHead0 from '@assets/deltarune/thrash-machine/thrash-machine-head-0.svg?react';
import ThrashMachineHead1 from '@assets/deltarune/thrash-machine/thrash-machine-head-1.svg?react';
import ThrashMachineHead2 from '@assets/deltarune/thrash-machine/thrash-machine-head-2.svg?react';
import ThrashMachineHead3 from '@assets/deltarune/thrash-machine/thrash-machine-head-3.svg?react';
import ThrashMachineBody0 from '@assets/deltarune/thrash-machine/thrash-machine-body-0.svg?react';
import ThrashMachineBody1 from '@assets/deltarune/thrash-machine/thrash-machine-body-1.svg?react';
import ThrashMachineBody2 from '@assets/deltarune/thrash-machine/thrash-machine-body-2.svg?react';
import ThrashMachineBody3 from '@assets/deltarune/thrash-machine/thrash-machine-body-3.svg?react';
import ThrashMachineShoe0 from '@assets/deltarune/thrash-machine/thrash-machine-shoe-0.svg?react';
import ThrashMachineShoe1 from '@assets/deltarune/thrash-machine/thrash-machine-shoe-1.svg?react';
import ThrashMachineShoe2 from '@assets/deltarune/thrash-machine/thrash-machine-shoe-2.svg?react';
import ThrashMachineShoe3 from '@assets/deltarune/thrash-machine/thrash-machine-shoe-3.svg?react';
import ThrashMachineShoe4 from '@assets/deltarune/thrash-machine/thrash-machine-shoe-4.svg?react';

export const THRASH_MACHINE_SOURCES = {
  head: [
    ThrashMachineHead0,
    ThrashMachineHead1,
    ThrashMachineHead2,
    ThrashMachineHead3,
  ],
  body: [
    ThrashMachineBody0,
    ThrashMachineBody1,
    ThrashMachineBody2,
    ThrashMachineBody3,
  ],
  shoe: [
    [ThrashMachineShoe0, ThrashMachineShoe0],
    [ThrashMachineShoe1, ThrashMachineShoe1],
    [ThrashMachineShoe2],
    [ThrashMachineShoe4, ThrashMachineShoe3],
  ],
} as const;
